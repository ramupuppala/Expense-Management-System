import React, { Component } from 'react';
class DetailsCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        console.log()
        debugger
        return (
            <React.Fragment>
                {
                    (this.props.categories) ?
                        this.prop.categories.categoryItems.map(
                            (itemList) => <React.Fragment>
                                <td>
                                    {itemList.item}
                                    {itemList.amount}
                                    {itemList.expenseDate}
                                </td>
                            </React.Fragment>

                        )
                        : <React.Fragment/>
                }
            </React.Fragment>
        );
    }
}

export default DetailsCategory;