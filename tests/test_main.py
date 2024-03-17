from fastapi.testclient import TestClient
from sqlmodel import Field, Session, SQLModel, create_engine, select
from contextlib import asynccontextmanager
from typing import Union, Optional, Annotated
# from fastapi_neon import settings
from sqlmodel import Field, Session, SQLModel, create_engine, select
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware  # Add this import

# https://sqlmodel.tiangolo.com/tutorial/fastapi/tests/#override-a-dependency
# from fastapi_neon.main import app, get_session, Todo

# from fastapi_neon import settings

class TestTodo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    content: str = Field(index=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating tables..")
    create_db_and_tables()
    yield

# Create the FastAPI app
app = FastAPI(lifespan=lifespan, title="API with DB", 
              version="0.0.1",
              servers=[
                  {
                      "url": "http://localhost:8000/",  # ADD NGROK URL Here Before Creating GPT Action
                      "description": "Development Server"
                  }
              ])

connection_string = "postgresql://ansarisudais333:Poxn52hIkBTs@ep-ancient-silence-a5pe46yn.us-east-2.aws.neon.tech/sqlDBWithFastAPI?sslmode=require"

engine = create_engine(
    connection_string, connect_args={"sslmode": "require"}, pool_recycle=300
)

# Function to create database tables
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
# https://fastapi.tiangolo.com/tutorial/testing/
# https://realpython.com/python-assert-statement/
# https://understandingdata.com/posts/list-of-python-assert-statements-for-unit-tests/

# postgresql://ziaukhan:oSUqbdELz91i@ep-polished-waterfall-a50jz332.us-east-2.aws.neon.tech/neondb?sslmode=require

def test_read_main():
    client = TestClient(app=app)
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "World"}

def test_write_main():

    connection_string_url = connection_string


    engine = create_engine(
        connection_string_url, connect_args={"sslmode": "require"}, pool_recycle=300)

    SQLModel.metadata.create_all(engine)  

    with Session(engine) as session:  

        def get_session_override():  
                return session  

        app.dependency_overrides[get_session] = get_session_override 

        client = TestClient(app=app)

        todo_content = "buy bread"

        response = client.post("/todos/",
            json={"content": todo_content}
        )

        data = response.json()

        assert response.status_code == 200
        assert data["content"] == todo_content

def test_read_list_main():

    connection_string_url = connection_string


    engine = create_engine(
        connection_string_url, connect_args={"sslmode": "require"}, pool_recycle=300)

    SQLModel.metadata.create_all(engine)  

    with Session(engine) as session:  

        def get_session_override():  
                return session  

        app.dependency_overrides[get_session] = get_session_override 
        client = TestClient(app=app)

        response = client.get("/todos/")
        assert response.status_code == 200
    