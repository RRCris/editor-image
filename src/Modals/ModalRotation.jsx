import { InputSlide } from "../Components";
import ModalBasic from "./ModalBasic";

import PropTypes from "prop-types";

export default function ModalRotation({ onBack, properties, onChange, AddHistoryItem }) {
	const handleChange = newvalue => {
		onChange({ ...properties, rotation: parseInt(newvalue) });
	};
	return (
		<ModalBasic position="bottom" type="inputs" onBack={onBack}>
			<InputSlide
				value={properties.rotation}
				defaultNumber={0}
				onChange={handleChange}
				min={0}
				max={360}
				name="Rotacion"
			/>
		</ModalBasic>
	);
}
ModalRotation.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
