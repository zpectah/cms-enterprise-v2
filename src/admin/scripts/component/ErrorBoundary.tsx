import React, { ErrorInfo } from 'react';

interface ErrorBoundaryProps {}

interface ErrorBoundaryState {
	isError: boolean;
	error: Error;
	errorInfo: ErrorInfo;
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
	> {
	constructor(props) {
		super(props);
		this.state = {
			isError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error: Error) {
		return { isError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({ isError: true, error, errorInfo });
		console.error(error);
		console.info(errorInfo);
	}

	render() {
		if (this.state.isError) {
			return (
				<div>
					<p>Something went wrong, see details in console</p>
					{this.state.error && <pre>{String(this.state.error)}</pre>}
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
