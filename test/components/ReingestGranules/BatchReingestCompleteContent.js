'use strict';

import test from 'ava';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, configure } from 'enzyme';

import BatchReingestComplete, {
  maxDisplayed
} from '../../../app/src/js/components/ReingestGranules/BatchReingestCompleteContent';

configure({ adapter: new Adapter() });

const anError = `1 error(s) occurred:
Execution Does Not Exist: 'arn:aws:states:us-east-1:123456789012:execution:TestStateMachine-Rcei43QwgSP6:bab9c234-e492-40e6-a34c-a0f76a4c7968'; Function params: [
  {
    "executionArn": "arn:aws:states:us-east-1:123456789012:execution:TestStateMachine-Rcei43QwgSP6:bab9c234-e492-40e6-a34c-a0f76a4c7968"
  }
]`;

test('Renders Error result', (t) => {
  const wrapper = shallow(
    <BatchReingestComplete results={[]} error={anError} />
  );

  t.true(wrapper.find('span').hasClass('error'));
  t.true(wrapper.text().includes(anError));
});

test('Renders success results with multiple Granules', (t) => {
  const results = ['granule-1', 'granule-2'];
  const wrapper = shallow(
    <BatchReingestComplete results={results} error={undefined} />
  );

  t.true(wrapper.html().includes('successfully reingested these granules'));
  t.is(wrapper.find('ul').children().length, 2);
});

test('Renders success results with a single granule', (t) => {
  const results = ['granule-1'];
  const wrapper = shallow(
    <BatchReingestComplete results={results} error={undefined} />
  );

  t.true(wrapper.html().includes('successfully reingested this granule'));
  t.is(wrapper.find('ul').children().length, 1);
  t.falsy(wrapper.html().match('and.* more'));
});

test('Limits success results with a many granules', (t) => {
  const results = Array.from(Array(maxDisplayed + 5).keys()).map(
    (t) => `granule-${t}`
  );

  const wrapper = shallow(
    <BatchReingestComplete results={results} error={undefined} />
  );

  t.true(wrapper.html().includes('successfully reingested these granules'));
  t.is(wrapper.find('ul').children().length, maxDisplayed + 1);
  t.true(wrapper.html().includes('and 5 more'));
});
