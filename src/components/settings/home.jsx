import React, { Component } from 'react';
import TextInput from '../textInput';
//import react redux modules
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
//Action imports
import * as categoryActions from '../../store/actions/categoryAction';
import * as budgetActions from '../../store/actions/budgetAction';

import { Link } from 'react-router-dom';

const ItemList = ({ itemList, onDelete }) => {
    return (
        <React.Fragment>
            <table class="table table-borderless col-6">
                <tbody>
                    {
                        (itemList)?
                        itemList[0].categoryItems.map(item =>
                                <tr key={item.id}>
                                    <td>{item.item}</td>
                                    <td><i class="fa fa-trash" style={{cursor:"pointer"}} onClick={() => onDelete(item.id)}></i></td>
                                </tr>
                        )
                        :""
                    }


                </tbody>
            </table>
        </React.Fragment>
    )
}


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            budget: "",
            categories: [],
            categoryEvents: [],
            errors: {}
        }
        this.updateBudget = this.updateBudget.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount() {
        this.props.budgetActions.receiveUserBudget();
        this.props.categoryActions.fetchCategories();
    }
    onChange = (event) => {
        console.log(this.state.budget)
        this.setState({ [event.target.name]: event.target.value },    console.log(this.state.budget));
    }
    updateBudget() {

        this.props.budgetActions.updateUserBudget(this.state.budget);

        alert("successful updated budget");

    }
    static getDerivedStateFromProps(props, state) {

            return {
                categories: props.categories
            };
       

    }
    selectCategory(event) {
        const { categoryEvents, categories } = this.state;
        let dataEvents = categories.filter(category => category.categoryName == event.target.value)
 
        this.setState({
            categoryEvents: dataEvents
        })
    }
    onDelete(id){
        const { categoryEvents, categories } = this.state;
        console.log(id);
        let dataCategory=categoryEvents;
        let categoryEventsData=categoryEvents[0].categoryItems.filter(item=>item.id != id);
        dataCategory[0].categoryItems=categoryEventsData;
        console.log("sdfsdfsdf",dataCategory);
        this.props.categoryActions.fetchUpdateCategory(dataCategory[0]);
    }
    render() {
        const { budget, categories, categoryEvents } = this.state;
        console.log(categoryEvents)
     
        return (
            <React.Fragment>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-sm-8">
                            <TextInput
                                htmlId="total_budget"
                                name="budget"
                                onChange={this.onChange}
                                label="Total Budget"
                                value={this.props.budget}
                                placeholder="Enter Total Budget"
                                // error={errors.firstName}
                                required />
                        </div>
                        <div className="col-sm-4">
                            <button className="btn btn-success" onClick={this.updateBudget}>Update</button>
                        </div>
                        <div className="col-sm-8 mt-5">

                            <div class="form-group">

                                <select class="form-control" id="sel1" name="sellist1" onChange={this.selectCategory}>
                                    <option >Select Category </option>
                                    {
                                        (categories) ?
                                            categories.map(category => <option value={category.categoryName} key={category.id}>{category.categoryName}</option>)
                                            : ""
                                    }

                                </select>
                            </div>

                        </div>
                        <div className="col-sm-4 mt-5">
                            <button className="btn btn-primary">Add </button>
                        </div>
                    </div>
                    <div className="item_categories">{
                        (categoryEvents.length>0) ? <ItemList itemList={categoryEvents} onDelete={this.onDelete} /> : ""
                    }
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

// Get state data from store to props
function mapStateToProps(state) {

    return {
        categories: state.CategoryReducer.categories,
        budget: state.BudgetReducer.budget
    }
}

// Get actions to handle store data
function mapDispatchToProps(dispatch) {
    return {
        categoryActions: bindActionCreators(categoryActions, dispatch),
        budgetActions: bindActionCreators(budgetActions, dispatch),
    };
}
// Wire it all up and export
export default connect(mapStateToProps, mapDispatchToProps)(Settings);

