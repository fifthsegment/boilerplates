import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TodoActionCreators from '../actions/index'
import {Card, Button, Page, Checkbox, TextField, DescriptionList} from "@shopify/polaris"

class UserList extends Component {
    constructor(props){
        super(props);
        this.state ={ newItemText: "", editingId:"" };
        this.inputHandlerAdd = this.inputHandlerAdd.bind(this);
        this.inputHandlerEdit = this.inputHandlerEdit.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    renderList() {

        return this.props.users.items.map((item) => {
            let itemtext = () => {
                if (this.state.editingId !== item.id ){
                    return <span >{item.name}</span>
                }else{
                    let edBtn = [];
                    edBtn[0] = <Button onClick={()=>this.updateItemLocal()}>Update</Button>;
                    return <span>
                                <TextField 
                                    type="text" 
                                    value={this.state.editItemText} 
                                    onChange={this.inputHandlerEdit}
                                    connectedRight={edBtn}
                                    />
                                </span>
                }
            }
            let label = [];
            label[0] = itemtext();
            return (
                <li key={item.id}>
                    <div >
                    <Checkbox label={label} checked={item.done} onChange={() => this.props.markDone(item)} />
                    <div style={{"textAlign":"right", paddingRight:"30px"}}>
                        <a  href="#" onClick={() => this.editItem( item ) }>Edit</a>
                        &nbsp;&nbsp;
                        <a  href="#" onClick={() => this.props.deleteItem(item)}>Delete</a>
                    </div>
                    </div>
                </li>
            );
        });
    }


    editItem(item){
        this.setState({editItemText:item.name, editingId: item.id});
    }

    updateItemLocal(){
        let item = {name: this.state.editItemText, id: this.state.editingId}
        this.props.updateItem(item);
    }

    componentWillReceiveProps(props){
        this.setState({editingId:"", editItemText:""})
    }

    componentDidMount(){
        this.props.getItems();
    }


    inputHandlerAdd(e){
        let val = e;
        this.setState({newItemText:val});
    }
    inputHandlerEdit(e){
        let val = e;
        this.setState({editItemText:val});
    }
    addItem(){
        this.props.addItem({name:this.state.newItemText}); 
        this.setState({newItemText:""}) 
    }
    render() {
        var loading = () => {
            if (this.props.users.loading){
                return <div>Updating List...</div>
            }            
        }
        let btnAdd = [];
        btnAdd[0] = <Button onClick={ this.addItem } loading={this.props.users.loading} primary fullWidth>Add</Button>

        return <Page>
                    <Card
                          title="Serverless Todos"
                          sectioned
                        >
                      <div>
                            <p>
                                A simple serverless TODO list powered by Amazon Lambda and DynamoDB. This application intends to demonstrate the capability of using Amazon DynamoDB as a data store and using it via a serverless lambda function (mobile app backends) .
                            </p>
                            <br/>
                            <TextField connectedRight={btnAdd} type="text" placeholder="Add a new item" onChange={this.inputHandlerAdd} value={this.state.newItemText}/>
                            {loading()}
                            <ul style={{"list-style":"none"}}>
                                    {this.renderList()}
                            </ul>
       
                      </div>
                    </Card>
     
        </Page>

    }

}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        users: state.users
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators(TodoActionCreators, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(UserList);
