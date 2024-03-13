from contextlib import asynccontextmanager
from typing import Annotated
from sqlmodel import Field, Session, SQLModel, create_engine, select, Integer
from fastapi import FastAPI, Depends
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Define the Todo model
class Todo(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    content: str = Field(index=True)

# Read DATABASE_URL from environment variables
connection_string: str | None = os.getenv("DATABASE_URL", "")
print(connection_string)
# Create the database engine
if connection_string:
    engine = create_engine(connection_string)
else:
    # Handle the case where connection_string is empty (None or "")
    raise ValueError("DATABASE_URL is not set in the environment.")
# Function to create database tables
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# Context manager for lifespan events
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating tables..")
    create_db_and_tables()
    yield

# Create the FastAPI app
app = FastAPI(lifespan=lifespan, title="Hello World API with DB", 
              version="0.0.1",
              servers=[
                  {
                      "url": "http://localhost:8000/",  # ADD NGROK URL Here Before Creating GPT Action
                      "description": "Development Server"
                  }
              ])

# Dependency to get a database session
def get_session():
    with Session(engine) as session:
        yield session

# Create a new Todo
@app.post("/todos", response_model=Todo)
def create_todo(todo: Todo, session: Annotated[Session, Depends(get_session)]):
    print(todo)
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo

# Get a list of all Todos
@app.get("/todos/", response_model=list[Todo])
def read_todos(session: Annotated[Session, Depends(get_session)]):
    todos = session.exec(select(Todo)).all()
    return todos

# Get a specific Todo by ID
@app.get("/todos/{todo_id}", response_model=Todo)
def read_todo(todo_id: int, session: Annotated[Session, Depends(get_session)]):
    todo = session.get(Todo, todo_id)
    return todo

# Update a Todo by ID
@app.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, todo: Todo, session: Annotated[Session, Depends(get_session)]):
    todo_in_db = session.get(Todo, todo_id)
    if todo_in_db:
        todo_in_db.content = todo.content
        session.add(todo_in_db)
        session.commit()
        session.refresh(todo_in_db)
        return todo_in_db
    return None  # Return None if Todo with given ID is not found


# Delete a Todo by ID
@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, session: Annotated[Session, Depends(get_session)]):
    todo_in_db = session.get(Todo, todo_id)
    if todo_in_db:
        session.delete(todo_in_db)
        session.commit()
        return {"message": "Todo deleted successfully"}
    return {"message": "Todo not found"}