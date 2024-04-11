import ModalBasic from "./ModalBasic";
import { InputSlide } from "../Components";

import PropTypes from "prop-types";

const defaultValue = 0;
export default function ModalFilterDesenfoque({ onBack, properties, onChange, AddHistoryItem }) {
	const handleChange = val => {
		onChange({ ...properties, filters: { ...properties.filters, desenfoque: val } });
	};

	return (
		<ModalBasic onBack={onBack} position="bottom" type="inputs">
			<InputSlide
				value={properties.filters.desenfoque}
				onChange={handleChange}
				defaultNumber={defaultValue}
				name="Desenfoque"
				max={20}
				min={0}
			/>
		</ModalBasic>
	);
}
ModalFilterDesenfoque.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
