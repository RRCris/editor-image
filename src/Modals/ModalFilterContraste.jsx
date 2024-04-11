import ModalBasic from "./ModalBasic";
import { InputSlide } from "../Components";

import PropTypes from "prop-types";

const defaultValue = 1;
export default function ModalFilterContraste({ onBack, properties, onChange, AddHistoryItem }) {
	const handleChange = val => {
		onChange({ ...properties, filters: { ...properties.filters, contraste: val } });
	};

	return (
		<ModalBasic onBack={onBack} position="bottom" type="inputs">
			<InputSlide
				value={properties.filters.contraste}
				onChange={handleChange}
				defaultNumber={defaultValue}
				name="Contraste"
				max={2.5}
				min={0}
			/>
		</ModalBasic>
	);
}
ModalFilterContraste.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
