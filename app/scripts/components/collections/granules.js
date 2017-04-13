'use strict';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { listGranules } from '../../actions';
import { tableHeader, tableRow, tableSortProps, bulkActions } from '../../utils/table-config/granules';
import List from '../table/list-view';

var CollectionGranules = React.createClass({
  displayName: 'CollectionGranules',

  propTypes: {
    granules: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    params: React.PropTypes.object
  },

  generateQuery: function () {
    return {
      collectionName: this.props.params.collectionName
    };
  },

  generateBulkActions: function () {
    const { granules } = this.props;
    return bulkActions(granules);
  },

  render: function () {
    const collectionName = this.props.params.collectionName;
    const { list } = this.props.granules;
    const { meta } = list;
    return (
      <div className='page__component'>
        <section className='page__section page__section__header-wrapper'>
          <h1 className='heading--large heading--shared-content with-description '>{collectionName}</h1>
          <Link className='button button--small form-group__element--right button--green' to={`/collections/edit/${collectionName}`}>Edit</Link>
          <dl className="metadata__updated">
            <dt>Last Updated:</dt>
            <dd>Sept. 23, 2016</dd>
            <dd className='metadata__updated__time'>2:00pm EST</dd>
          </dl>
        </section>

        <section className='page__section'>
          <div className='heading__wrapper--border'>
            <h2 className='heading--medium heading--shared-content with-description'>Granules <span className='num--title'>{meta.count ? ` (${meta.count})` : null}</span></h2>
          </div>

          <List
            list={list}
            dispatch={this.props.dispatch}
            action={listGranules}
            tableHeader={tableHeader}
            tableRow={tableRow}
            tableSortProps={tableSortProps}
            query={this.generateQuery()}
            bulkActions={this.generateBulkActions()}
            rowId={'granuleId'}
          />
        </section>

      </div>
    );
  }
});

export default connect(state => state)(CollectionGranules);
