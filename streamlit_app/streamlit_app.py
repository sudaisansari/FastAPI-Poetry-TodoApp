import streamlit as st
import requests

# FastAPI backend URL
API_URL = "http://localhost:8000"

# Streamlit UI for creating a new Todo
def create_todo():
    st.header("Create a new Todo")
    content = st.text_input("Todo Content")
    if st.button("Create"):
        response = requests.post(f"{API_URL}/todos", json={"content": content})
        if response.status_code == 200:
            st.success(f"Todo created successfully: {response.json()}")
        else:
            st.error(f"Failed to create Todo: {response.text}")

# Streamlit UI for reading all Todos
def read_todos():
    st.title("Todo List")

    # Replace the URL with the actual endpoint of your FastAPI app
    api_url = "http://localhost:8000/todos/"

    # Fetch todos from the FastAPI backend
    response = requests.get(api_url)
    
    if response.status_code == 200:
        todos = response.json()
        for todo in todos:
            st.write(f"Todo ID: {todo[id]}, Content: {todo['content']}")
    else:
        st.error(f"Failed to fetch todos. Status code: {response.status_code}")


# Streamlit UI for updating a Todo
def update_todo():
    st.header("Update Todo")
    todo_id = st.number_input("Enter Todo ID to update", value=1)
    content = st.text_input("New Todo Content")
    if st.button("Update"):
        response = requests.put(f"{API_URL}/todos/{todo_id}", json={"content": content})
        if response.status_code == 200:
            st.success(f"Todo updated successfully: {response.json()}")
        else:
            st.error(f"Failed to update Todo: {response.text}")

# Streamlit UI for deleting a Todo
def delete_todo():
    st.header("Delete Todo")
    todo_id = st.number_input("Enter Todo ID to delete", value=1)
    if st.button("Delete"):
        response = requests.delete(f"{API_URL}/todos/{todo_id}")
        if response.status_code == 200:
            st.success("Todo deleted successfully")
        else:
            st.error(f"Failed to delete Todo: {response.text}")

# Main Streamlit App
def main():
    st.title("FastAPI and Streamlit Todo App")
    create_todo()
    read_todos()
    update_todo()
    delete_todo()

if __name__ == "__main__":
    main()
