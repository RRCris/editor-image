import ModalBasic from "./ModalBasic";
import { InputText } from "../Components";

import PropTypes from "prop-types";

export default function ModalRename({ onBack, properties, onChange, AddHistoryItem }) {
	const handleChange = val => {
		onChange({ ...properties, object: { ...properties.object, name: val } });
	};

	return (
		<ModalBasic onBack={onBack} position="bottom" type="inputs">
			<InputText value={properties.object.name} onChange={handleChange} name="Name" />
		</ModalBasic>
	);
}
ModalRename.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
