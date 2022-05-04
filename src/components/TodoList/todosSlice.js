import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const todosSlice = createSlice({
	name: "todoList",
	initialState: { status: "idle", todos: [] }, // [] => {status: '', todos: []}
	reducers: {
		// IMMER
		addTodo: (state, action) => {
			state.push(action.payload);
		}, // action creators
		toggleTodoStatus: (state, action) => {
			const currentTodo = state.find(
				(todo) => todo.id === action.payload
			);
			if (currentTodo) {
				currentTodo.completed = !currentTodo.completed;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.todos = action.payload;
				state.status = "idle";
			});
	},
});

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
	const res = await fetch("/api/todos");
	const data = await res.json();
	return data.todos;
});

// => todos/fetchTodos/pending
// => todos/fetchTodos/fullfilled
// => todos/fetchTodos/rejected

export default todosSlice;

// action(object) va action creator () => {return action}
// thunk action(function) va thunk action creator () => {return thunk action}

// export function addTodos(todo) {
// 	// thunk function - thunk action

// 	return function addTodosThunks(dispatch, getState) {
// 		console.log("[addTodosThunk]", getState());
// 		console.log({ todo });
// 		// custom payload
// 		todo.name = "Tung test updated";

// 		dispatch(todosSlice.actions.addTodo(todo));

// 		console.log("[addTodosThunk after]", getState());
// 	};
// }
