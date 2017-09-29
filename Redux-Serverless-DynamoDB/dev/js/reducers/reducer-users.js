/*
 * The users reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */

export default function ( state, action ) {
    // console.log(action)
    switch (action.type){
        case "START_LOADING":
            return action.payload;
        case "STOP_LOADING":
            return action.payload;
        case "FETCHED_ITEMS":
            return action.payload;
        default: 
            return {
                
                items:[]
            }
    }

}
