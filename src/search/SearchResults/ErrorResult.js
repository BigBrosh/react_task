import React from 'react';

export const ErrorResult = props => 
	<div>
		<p>There was a problem with your search.<br/>{`${props.response.name}: ${props.response.message}`}</p>
	</div>;