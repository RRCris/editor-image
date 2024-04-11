import ModalBasic from "./ModalBasic";
import { InputNumber, RadioButton } from "../Components";
import { Iconify } from "../Components/Iconify/Iconify";
import PropTypes from "prop-types";
export default function ModalSize({ onBack, properties, onChange, AddHistoryItem }) {
	const handleChangeW = newValue => {
		onChange && onChange({ ...properties, width: newValue });
	};
	const handleChangeH = newValue => {
		onChange && onChange({ ...properties, height: newValue });
	};
	const handleChangeAspectRatio = newValue => {
		onChange && onChange({ ...properties, lockAspect: newValue });
	};

	return (
		<ModalBasic onBack={onBack} position="bottom" type="inputs" style={{ flexDirection: "column" }}>
			<Iconify
				icon="carbon:help"
				size={32}
				style={{ minWidth: 32 }}
				onClick={() => AddHistoryItem({ modalName: "helpSize", frame: "select", id: properties.id })}
			/>
			<div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
				<InputNumber value={properties.width} onChange={handleChangeW} name="W" />
				<InputNumber value={properties.height} onChange={handleChangeH} name="H" />

				<RadioButton icon="majesticons:lock" value={properties.lockAspect} onChange={handleChangeAspectRatio} />
				<RadioButton
					icon="iconoir:frame"
					onChange={() => AddHistoryItem({ frame: "size", id: properties.id, modalName: "formatsSize" })}
				/>
			</div>
		</ModalBasic>
	);
}
ModalSize.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
