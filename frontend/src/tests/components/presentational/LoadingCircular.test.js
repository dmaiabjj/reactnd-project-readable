import React from "react"
import LoadingCircular from "../../../components/presentational/LoadingCircular"
import ReactRouterEnzymeContext from 'react-router-enzyme-context'

describe('[Presentational Component] LoadingCircular', () => {
  const context   = new ReactRouterEnzymeContext();

  it('Shallow renders correctly', () => {
    expect(shallow(<LoadingCircular/>,context.get()));
	});


});
