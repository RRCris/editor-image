import ModalBasic from "./ModalBasic";


import PropTypes from "prop-types";
import { useRef } from "react";

export default function ModalExport({ onBack, properties}) {
	const refDownload = useRef(null);
	const handleDownload = () => {
		refDownload.current && refDownload.current.click();
	};
	return (
		<ModalBasic onBack={onBack} blur position="center" type="float">
			<div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
				<div style={{ width: "60%" }}>
					{properties.preview ? <img src={properties.preview} alt="preview canvas" /> : <h1>Loading</h1>}
				</div>
				<button onClick={handleDownload}>Export</button>
				<a href={properties.preview} download="imagenEditada" ref={refDownload} hidden>
					Imagen
				</a>
			</div>
		</ModalBasic>
	);
}

ModalExport.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
