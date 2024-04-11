import ModalBasic from "./ModalBasic";

import PropTypes from "prop-types";

import { ButtonFilter } from "../Components";
import { useWidth } from "../hooks";
import { Iconify } from "../Components/Iconify/Iconify"

export default function ModalFilters({ onBack, properties, onChange, AddHistoryItem }) {
	const md = useWidth("md");
	return (
		<ModalBasic position="center" type="float" blur onBack={onBack} style={{ flexDirection: "column" }}>
			<Iconify
				icon="carbon:help"
				size={32}
				style={{ minWidth: 32 }}
				onClick={() => AddHistoryItem({ modalName: "helpFilter", frame: "select", id: properties.id })}
			/>
			<div style={{ display: "grid", gridTemplateColumns: md.watch ? "1fr 1fr 1fr" : "1fr 1fr", gap: "7px" }}>
				<ButtonFilter
					name="desenfoque"
					filters={properties.filters}
					onClick={() => AddHistoryItem({ modalName: "filterDesenfoque", id: properties.id, frame: "select" })}
				/>
				<ButtonFilter
					name="sepia"
					filters={properties.filters}
					onClick={() => AddHistoryItem({ modalName: "filterSepia", id: properties.id, frame: "select" })}
				/>
				<ButtonFilter
					name="saturacion"
					filters={properties.filters}
					onClick={() => AddHistoryItem({ modalName: "filterSaturacion", id: properties.id, frame: "select" })}
				/>
				<ButtonFilter
					name="contraste"
					filters={properties.filters}
					onClick={() => AddHistoryItem({ modalName: "filterContraste", id: properties.id, frame: "select" })}
				/>
				<ButtonFilter
					name="hue"
					filters={properties.filters}
					onClick={() => AddHistoryItem({ modalName: "filterHue", id: properties.id, frame: "select" })}
				/>
				<ButtonFilter
					name="grises"
					filters={properties.filters}
					onClick={() => AddHistoryItem({ modalName: "filterGrises", id: properties.id, frame: "select" })}
				/>
				<ButtonFilter
					name="brillo"
					filters={properties.filters}
					onClick={() => AddHistoryItem({ modalName: "filterBrillo", id: properties.id, frame: "select" })}
				/>
			</div>
		</ModalBasic>
	);
}
ModalFilters.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
