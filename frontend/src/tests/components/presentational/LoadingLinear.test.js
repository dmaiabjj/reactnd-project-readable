import React from "react"
import LoadingLinear from "../../../components/presentational/LoadingLinear"
import ReactRouterEnzymeContext from 'react-router-enzyme-context'

describe('[Presentational Component] LoadingLinear', () => {
  const context   = new ReactRouterEnzymeContext();

  it('Shallow renders correctly', () => {
    expect(shallow(<LoadingLinear/>,context.get()));
	});



});
