import ModalBasic from "./ModalBasic";

import PropTypes from "prop-types";

export default function ModalHelpSize({ onBack, properties, onChange, AddHistoryItem }) {
	return (
		<ModalBasic onBack={onBack} blur position="center" type="float">
			<video
				src="https://v3.cdnpk.net/videvo_files/video/free/2013-08/large_preview/hd0992.mp4"
				width={200}
				autoPlay
				loop
				style={{ borderRadius: "15px" }}
			/>
		</ModalBasic>
	);
}

ModalHelpSize.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
