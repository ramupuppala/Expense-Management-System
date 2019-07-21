import React, { Component } from 'react';
//import react redux modules
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
//Action imports
import * as categoryActions from '../../store/actions/categoryAction';
import * as budgetActions from '../../store/actions/budgetAction';
import { Link } from 'react-router-dom';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function option(){

}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],            
            categoryTotalAmount: null,
            budget: null,
            categoryItemIndidualAmount:[]
        }
    }
    componentDidMount() {
        this.props.categoryActions.fetchCategories();
    }

    static getDerivedStateFromProps(props, state) {
        let totalAmount = 0;
        let arrayCategoryItem=[];
        let sumItem=0;
        
        if (props.categories) {
            for (let i = 0; i < props.categories.length; i++) {

                for (let j = 0; j < props.categories[i].categoryItems.length; j++) {
                    totalAmount += parseInt(props.categories[i].categoryItems[j].amount);
                    sumItem=totalAmount;
                }
                arrayCategoryItem[i]=sumItem;
            }

            return {
                categories: props.categories,
                categoryTotalAmount: totalAmount,
                categoryItemIndidualAmount:arrayCategoryItem,
                budget:props.budget
            };
        }
        return null;


    }
    render() {
        const { categories, categoryTotalAmount, budget,categoryItemIndidualAmount } = this.state;

        const optionsForBugdet = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Budget Overview"
            },
            data: [{
                type: "pie",
                startAngle: 75,
                indexLabel: "#percent%",
                percentFormatString: "#0.##",
                toolTipContent: "{y} (#percent%)",
                legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}",
				showInLegend: "true",
                dataPoints: [
                    { y: budget, label: "Total Budget" },
                    { y: categoryTotalAmount, label: "Total Expense" }

                ]
            }]
        }
        const optionsForCategory = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Category Overview"
            },
            data: [{
                type: "pie",
                startAngle: 75,
                indexLabel: "#percent%",
                percentFormatString: "#0.##",
                toolTipContent: "{y} (#percent%)",
                legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}",
				showInLegend: "true",
                dataPoints: [
                    { y: categoryItemIndidualAmount[0], label: "" },
                    { y: categoryItemIndidualAmount[1], label: "" }

                ]
            }]
        }
        return (
            <React.Fragment>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-sm-6">
                            <div class="card">
                                <div class="card-header">Budget Overview</div>
                                <div class="card-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <CanvasJSChart options={optionsForBugdet}
                                            /* onRef={ref => this.chart = ref} */
                                            />
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div class="card">
                                <div class="card-header">Category wise spit</div>
                                <div class="card-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                        <CanvasJSChart options={optionsForCategory}
                                            /* onRef={ref => this.chart = ref} */
                                            />
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="expense mt-3 table-responsive">
                        <button className="btn btn-primary"><Link to="/createItem" style={{ color: "white", cursor: "pointer" }}>Add Expense</Link></button>
                        <table class="table table-dark table-hover mt-3 ">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Category</th>
                                    <th>Item Name</th>
                                    <th>Amount</th>
                                    <th>Expire Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (categories) ?
                                        (categories.length > 0) ?
                                            categories.map((categoryItem) =>
                                                <React.Fragment>


                                                    {/* <CategoryDetailTable categories={categoryItems}/> */}
                                                    {
                                                        categoryItem.categoryItems.map((item) => (
                                                            <React.Fragment>
                                                                <tr>
                                                                    <td><Link
                                                                        key={item.id}
                                                                        to={{
                                                                            pathname: '/editItem/' + categoryItem.id + '/' + item.id
                                                                        }} >
                                                                        <i class="fa fa-edit" style={{ color: "white" }}></i></Link>
                                                                    </td>
                                                                    <td>{categoryItem.categoryName}</td>
                                                                    <td>{item.item}</td>
                                                                    <td>{item.amount}</td>
                                                                    <td>{item.expenseDate}</td>
                                                                </tr>
                                                            </React.Fragment>
                                                        ))
                                                    }

                                                </React.Fragment>
                                            )
                                            : ""
                                        : ""
                                }
                            </tbody>
                        </table>
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
    };
}
// Wire it all up and export
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
