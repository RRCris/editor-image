import ModalBasic from "./ModalBasic";

import PropTypes from "prop-types";
export default function ModalInfo({ onBack, message }) {
	return (
		<ModalBasic onBack={onBack} position="bottom" type="inputs">
			<p style={{ color: "#FFF", background: "#5e00a0", padding: 5, width: "100%", textAlign: "center" }}>{message}</p>
		</ModalBasic>
	);
}
ModalInfo.propTypes = {
	onBack: PropTypes.func,
	message: PropTypes.string,
};
