import React, { Component } from 'react';
import Category from '../../components/Category';
import ResponsiveAppBar from '../../components/Appbar';
import CategoryStore from './CategoryStore';
import withNavigate from '../../routes/withNavigate';

class CategoryContainer extends Component {
    state = {
        selectedCategorary: ""
    };

    componentDidMount() {
        this.props.getAllCategory2();
    }
    handleCategoryChange = (id) => {
        this.setState({
            selectedCategorary: id
        })
        this.props.getAllSubCategory({
            category_id: id
        })
    }


    render() {
        if (this.props.categoryLoading) {
            return null
        }

        return (
            <div>
                <ResponsiveAppBar />
                <Category data={{ getAllCategory: this.props.storeAllCategory, getAllSubCategory: this.props.storeAllSubCategory, selectedCategorary: this.state.selectedCategorary, handleOnChane: this.handleCategoryChange }} />
            </div>
        );
    }
}

export default withNavigate(CategoryStore(CategoryContainer));
