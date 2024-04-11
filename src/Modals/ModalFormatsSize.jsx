import ModalBasic from "./ModalBasic";
import { ButtonAspect } from "../Components";
import PropTypes from "prop-types";
export default function ModalFormatsSize({ onBack, properties, onChange, AddHistoryItem }) {
	const handleChange = aspect => {
		onChange({ ...properties, height: aspect * properties.width, lockAspect: false });
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

ModalFormatsSize.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
