import ModalBasic from "./ModalBasic";
import { ButtonAspect } from "../Components";
import PropTypes from "prop-types";
export default function ModalFormatsCrop({ onBack, properties, onChange, AddHistoryItem }) {
	const handleChange = aspect => {
		const firstPosition = properties.clipPath[0];
		const width = properties.clipPath[1].x - properties.clipPath[0].x;
		const height = width * aspect;
		onChange({
			...properties,
			clipPath: [
				firstPosition,
				{ x: firstPosition.x + width, y: firstPosition.y },
				{ x: firstPosition.x + width, y: firstPosition.y + height },
				{ x: firstPosition.x, y: firstPosition.y + height },
			],
			lockAspectCrop: false,
		});
		onBack();
	};
	return (
		<ModalBasic onBack={onBack} position="center" type="float" blur>
			<div>
				<ButtonAspect width={9} height={16} onClick={handleChange} />
				<ButtonAspect width={1} height={1} onClick={handleChange} />
				<ButtonAspect width={3} height={4} onClick={handleChange} />
			</div>
			<div>
				<ButtonAspect width={16} height={9} onClick={handleChange} />
				<ButtonAspect width={4} height={3} onClick={handleChange} />
				<ButtonAspect width={21} height={9} onClick={handleChange} />
			</div>
		</ModalBasic>
	);
}

ModalFormatsCrop.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
