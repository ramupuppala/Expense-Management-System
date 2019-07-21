import React, { Component } from 'react';
import TextInput from '../../textInput';
//import react redux modules
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
//Action imports
import * as categoryActions from '../../../store/actions/categoryAction';


class EditCategoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            categoryName: "",
            categoryItems: {
                amount: "",
                item: "",
                expenseDate: ""
            },
            budget: "",
            errors: {},
            categories: []
        }
    }
    componentDidMount() {
        console.log(this.props.match.params.category);
        this.props.categoryActions.fetchCategoryById(this.props.match.params.category);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.categories) {
           
            let data=newProps.categories.categoryItems.filter( item => item.id==this.props.match.params.item);
            console.log(newProps.categories)
            this.setState({
                categoryItems:data[0],
                categories:newProps.categories
            })
            // this.setState(prevState => ({    // prevState?
            //     console.log(prevState)
            //     // categoryItems: prevState.categoryItems.filter( item => item.id==this.props.match.params.item)
            // }),console.log(this.state.categoryItems));
        }
    }
     //change event storing input customer values
     onChange = (event) => {
        const categoryItems = this.state.categoryItems;     
            categoryItems[event.target.name] = event.target.value;
        this.setState({ categoryItems });
    }
     //Submit the values to the edit customer details 
     onSubmit = () => {
        const { categoryItems,categories } = this.state;
        let categoryItemData=categoryItems;
        categoryItemData.id=this.props.match.params.item;
        let categoriesData=categories;
        let data=categories.categoryItems.map(item => (item.id == this.props.match.params.item ? item=categoryItemData : item));
        // data=categories.categoryItems.push(data);
        categoriesData.categoryItems=data;
        this.props.categoryActions.fetchUpdateCategory(categoriesData);
    }
    render() {
        const { categoryItems, categories } = this.state;
        console.log(categoryItems.expenseDate)
        return (
            <React.Fragment>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-sm-8">
                            <div class="input-group">
                                <div className="col-sm-4">
                                   <b> Category Name</b>
                                </div>
                                <div className="col-sm-8">
                                    <b>{categories.categoryName}</b>
                                </div>
                            </div>
                           
                        </div>
                        <div className="col-sm-8 mt-5">
                            <TextInput
                                htmlId="item_name"
                                type="text"
                                name="item"
                                onChange={this.onChange}
                                label="Item Name"
                                value={categoryItems.item}
                                placeholder="Enter Item Name"
                                // error={errors.firstName}
                                required />
                        </div>

                        <div className="col-sm-8 mt-5">
                            <TextInput
                                htmlId="item_amount"
                                name="amount"
                                onChange={this.onChange}
                                label="Item Amount"
                                value={categoryItems.amount}
                                placeholder="Enter Item Amount"
                                type="number"
                                // error={errors.firstName}
                                required />

                        </div>
                        <div className="col-sm-8 mt-5">
                            <TextInput
                                htmlId="expnes_date"
                                name="expenseDate"
                                onChange={this.onChange}
                                label="Expens Date"
                                value={categoryItems.expenseDate}
                                placeholder="Enter Expens Date"
                                type="date"
                                // error={errors.firstName}
                                required />

                        </div>
                        <div className="col-sm-4 mt-5">
                            <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Add </button>
                        </div>
                    </div>
                    <div className="item_categories">

                    </div>
                </div>
            </React.Fragment>
        );
    }
}
// Get state data from store to props
function mapStateToProps(state) {
    console.log(state.CategoryReducer.categories)
    return {
        categories: state.CategoryReducer.category,
    }
}

// Get actions to handle store data
function mapDispatchToProps(dispatch) {
    return {
        categoryActions: bindActionCreators(categoryActions, dispatch),
    };
}
// Wire it all up and export
export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryItem);
