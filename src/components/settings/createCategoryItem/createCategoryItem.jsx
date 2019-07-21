import React, { Component } from 'react';
import TextInput from '../../textInput';
//import react redux modules
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
//Action imports
import * as categoryActions from '../../../store/actions/categoryAction';

class CreateCategory extends Component {
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
            categories: [],
        }
        this.selectCategory=this.selectCategory.bind(this);
    }
    componentDidMount() {
        // this.props.categoryActions.fetchCategoryById(this.props.match.params.id);
        this.props.categoryActions.fetchCategories();
    }
    static getDerivedStateFromProps(props, state) {
        if(props.categories != undefined)
        {
            console.log(props.categories,"categories")
            console.log(state.categories,"state categories")
            return {
                categories: props.categories
            };
        }
        if(props.category != undefined)
        {
            return {
                category: props.category
            };
        }
        return null;
      
        
    }

    selectCategory(event) {
        console.log(event.target.value)
        if(event.target.value)
        this.props.categoryActions.fetchCategoryById(event.target.value);
    }
    
    //change event storing input customer values
    onChange = (event) => {
        const categoryItems = this.state.categoryItems;
        categoryItems[event.target.name] = event.target.value;
        this.setState({ categoryItems });
    }
    //Submit the values to the edit customer details 
    onSubmit = () => {
        const { categoryItems, category } = this.state;
        console.log(category)
        let len = category.categoryItems.length;
        debugger;
        let categoryItemData = categoryItems;
        categoryItemData.id = parseInt(category.categoryItems[len - 1].id) + 1;
        let data = category;
        data.categoryItems.push(categoryItemData);
        console.log(data);
        this.props.categoryActions.fetchUpdateCategory(data);
    }
    render() {
        const { categoryItems, categories } = this.state;
        console.log(categories)
        return (
            <React.Fragment>

                <div className="container mt-5">
                    <div className="row">
                        <div className="col-sm-8">

                            <div class="form-group">
                                <select class="form-control" id="sel1" name="sellist1" onChange={this.selectCategory}>
                                    <option >Select Category </option>
                                    {
                                        (categories) ?
                                            categories.map(category => <option value={category.id} key={category.id}>{category.categoryName}</option>)
                                            : ""
                                    }

                                </select>
                            </div>
                           

                        </div>
                        <div className="col-sm-8 mt-5">
                            <TextInput
                                htmlId="item_name"
                                type="text"
                                name="item"
                                onChange={this.onChange}
                                label="Item Name"
                                // value={categoryItems.item}
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
                                // value={categoryItems.amount}
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
                                // value={categoryItems.expenseDate}
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
    console.log(state.CategoryReducer.category)
    return {
        categories: state.CategoryReducer.categories,
        category: state.CategoryReducer.category,
        
    }
}

// Get actions to handle store data
function mapDispatchToProps(dispatch) {
    return {
        categoryActions: bindActionCreators(categoryActions, dispatch),
    };
}
// Wire it all up and export
export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory);
