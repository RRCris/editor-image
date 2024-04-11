import ModalBasic from "./ModalBasic";
import { InputNumber, RadioButton } from "../Components";
import { Iconify } from "../Components/Iconify/Iconify";

import PropTypes from "prop-types";
export default function ModalCrop({ onBack, properties, onChange, AddHistoryItem }) {
	const handleChangeT = newValue => {
		if (newValue < 0) return false;

		onChange &&
			onChange({
				...properties,
				// eslint-disable-next-line prettier/prettier
				clipPath: [
					{ x: properties.clipPath[0].x, y: newValue },
					{ x: properties.clipPath[1].x, y: newValue },
					properties.clipPath[2],
					properties.clipPath[3],
				],
			});
	};
	const handleChangeB = newValue => {
		if (newValue < 0) return false;
		console.log(newValue);

		onChange &&
			onChange({
				...properties,
				// eslint-disable-next-line prettier/prettier
				clipPath: [
					properties.clipPath[0],
					properties.clipPath[1],
					{ x: properties.clipPath[2].x, y: newValue },
					{ x: properties.clipPath[3].x, y: newValue },
				],
			});
	};
	const handleChangeR = newValue => {
		if (newValue < 0) return false;

		onChange &&
			onChange({
				...properties,
				// eslint-disable-next-line prettier/prettier
				clipPath: [
					properties.clipPath[0],
					{ y: properties.clipPath[1].y, x: newValue },
					{ y: properties.clipPath[2].y, x: newValue },
					properties.clipPath[3],
				],
			});
	};
	const handleChangeL = newValue => {
		if (newValue < 0) return false;

		onChange &&
			onChange({
				...properties,
				// eslint-disable-next-line prettier/prettier
				clipPath: [
					{ y: properties.clipPath[0].y, x: newValue },
					properties.clipPath[1],
					properties.clipPath[2],
					{ y: properties.clipPath[3].y, x: newValue },
				],
			});
	};
	const handleChangeAspectRatio = () => {
		onChange({ ...properties, lockAspectCrop: !properties.lockAspectCrop });
	};

	return (
		<ModalBasic onBack={onBack} position="bottom" type="inputs" style={{ flexDirection: "column" }}>
			<Iconify
				icon="carbon:help"
				size={32}
				style={{ minWidth: 32 }}
				onClick={() => AddHistoryItem({ modalName: "helpCrop", frame: "select", id: properties.id })}
			/>
			<div style={{ display: "flex", alignItems: "center", gap: 7 }}>
				<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 5 }}>
					<InputNumber value={properties.clipPath[0].y} onChange={handleChangeT} name="⬇" />
					<InputNumber value={properties.clipPath[3].y} onChange={handleChangeB} name="⬆" />
				</div>
				<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 5 }}>
					<RadioButton icon="majesticons:lock" value={properties.lockAspectCrop} onChange={handleChangeAspectRatio} />
					<RadioButton
						icon="iconoir:frame"
						onChange={() => AddHistoryItem({ frame: "size", id: properties.id, modalName: "formatsCrop" })}
					/>
				</div>
				<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 5 }}>
					<InputNumber value={properties.clipPath[1].x} onChange={handleChangeR} name="⬅" />
					<InputNumber value={properties.clipPath[0].x} onChange={handleChangeL} name="➡" />
				</div>
			</div>
		</ModalBasic>
	);
}
ModalCrop.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
