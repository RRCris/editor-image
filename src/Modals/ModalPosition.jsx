import ModalBasic from "./ModalBasic";
import { InputNumber } from "../Components";
import { Iconify } from "../Components/Iconify/Iconify";

import PropTypes from "prop-types";
export default function ModalPosition({ onBack, properties, onChange, AddHistoryItem }) {
	const handleChangeX = newValue => {
		onChange && onChange({ ...properties, positionX: newValue });
	};
	const handleChangeY = newValue => {
		onChange && onChange({ ...properties, positionY: newValue });
	};
	return (
		<ModalBasic onBack={onBack} position="bottom" type="inputs">
			<Iconify
				icon="carbon:help"
				size={32}
				style={{ minWidth: 32 }}
				onClick={() => AddHistoryItem({ modalName: "helpPosition", frame: "select", id: properties.id })}
			/>
			<InputNumber value={properties.positionX} onChange={handleChangeX} name="X" />
			<InputNumber value={properties.positionY} onChange={handleChangeY} name="Y" />
		</ModalBasic>
	);
}
ModalPosition.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
