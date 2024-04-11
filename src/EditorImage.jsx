
import { lazy, Suspense, useRef } from "react";
import PropTypes from "prop-types";



const Control = lazy(() => import("./Control/ControlCanvas"));
EditorImage.propTypes = {
	defaultImage: PropTypes.array,
	data: PropTypes.string,
};

export function EditorImage({ defaultImage = []}) {
	
	const refImage = useRef(null);

	

	const handleActiveUpdate = img => {
		refImage.current = img;
		
	};
	return (
		<Suspense fallback={<h1>Loading</h1>}>
			
			<Control defaultImage={defaultImage} onUpload={handleActiveUpdate} />
		</Suspense>
	);
}
