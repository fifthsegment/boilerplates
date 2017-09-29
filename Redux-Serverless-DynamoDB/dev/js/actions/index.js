import axios from "axios";

axios.defaults.baseURL = "https://your-own-url.execute-api.us-east-2.amazonaws.com/prod/simple-backend";


export const startLoading = ( items = null ) =>{
	return (dispatch, getState) => {
		let newItems = items ? items : getState().users.items;
		dispatch(
			{
				type: 'START_LOADING',
				payload: {
					loading: true,
					items: newItems,
				}
			}
		)
	}

}

export const stopLoading = () =>{
	return {
		type: 'STOP_LOADING',
		payload: {
			loading: false,
			items: [],
		}
	}
}

export const fetchedItems = (data) => {
	return {
		type: 'FETCHED_ITEMS',
		payload: {
			items: data.data.data.Items
		}
	}
}

export const getItems = () => {
	return (dispatch, getState) => {
		console.log(getState());
		dispatch(startLoading());
			console.log("POSTING ITEMS")
		axios.post("",{
		  "operation": "list"
		  }).then((res)=>{
			dispatch(fetchedItems(res));
		}).catch(function (error) {
		    console.log(error);
		});
		// dispatch(stopLoading());
	}
}

export const markDone = (item) => {
	return (dispatch, getState) => {
		dispatch(startLoading());
		axios.post("",{
		  "operation": "update",
		  "data": {"id":item.id, "name": item.name, "done": !item.done}
		}).then((res)=>{
			// dispatch(fetchedItems(res));
			dispatch(getItems());
		}).catch(function (error) {
		    console.log(error);
		});
	}
}

export const deleteItem = (item) => {
	
	return (dispatch, getState) => {
		dispatch(startLoading());
		axios.post("",{
		  "operation": "delete",
		  "data": {"id":item.id}
		}).then((res)=>{
			// dispatch(fetchedItems(res));
			dispatch(getItems());
		}).catch(function (error) {
		    console.log(error);
		});
	}
}

export const addItem = ( item ) => {
	return (dispatch, getState) => {
		dispatch(startLoading());
		axios.post("",{
		  "operation": "create",
		  "data": item
		}).then((res)=>{
			// dispatch(fetchedItems(res));
			dispatch(getItems());
		}).catch(function (error) {
		    console.log(error);
		});
	}
}

export const updateItem = ( item ) => {
	return (dispatch, getState) => {
		let items = getState().users.items;
		let index = items.findIndex((e)=>{return e.id === item.id });
		items[index].name = item.name;
		dispatch(startLoading(items));
		axios.post("",{
		  "operation": "update",
		  "data": item
		}).then((res)=>{
			// dispatch(fetchedItems(res));
			dispatch(getItems());
		}).catch(function (error) {
		    console.log(error);
		});
	}
}