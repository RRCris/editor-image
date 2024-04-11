import ModalBasic from "./ModalBasic";

import PropTypes from "prop-types";
import { ButtonList, ButtonOption } from "../Components";
export default function ModalTools({ onBack, properties, onChange, AddHistoryItem }) {
	return (
		<ModalBasic onBack={onBack} blur position="bottom" type="options">
			<div style={{ width: "100%" }}>
				<div style={{ width: "230px", margin: "0 auto", position: "absolute", top: "-100px", left: 0, right: 0 }}>
					<ButtonList object={properties} />
				</div>
				<p
					style={{
						textAlign: "center",
						fontSize: 26,
						fontStyle: "normal",
						fontWeight: "500",
						lineHeight: "normal",
						paddingBottom: 10,
					}}
				>
					¿Que vas a cambiar?
				</p>
				<div style={{ width: "100%", background: "#000000", height: 1 }} />
				<ButtonOption
					onClick={() => AddHistoryItem({ modalName: "crop", id: properties.id, frame: "crop" })}
					name="Recorte"
					icon="ri:crop-2-line"
				/>
				<ButtonOption
					name="Posicion"
					icon="mdi:arrow-all"
					onClick={() => AddHistoryItem({ modalName: "position", id: properties.id, frame: "position" })}
				/>
				<ButtonOption
					name="Tamaño"
					icon="clarity:resize-line"
					onClick={() => AddHistoryItem({ modalName: "size", id: properties.id, frame: "size" })}
				/>
				<ButtonOption
					name="Reordenar"
					icon="solar:layers-outline"
					onClick={() => AddHistoryItem({ modalName: "layersCanvas", id: "root", frame: "select" })}
				/>
				<ButtonOption
					name="Filtros"
					icon="ph:magic-wand-duotone"
					onClick={() => AddHistoryItem({ modalName: "filters", id: properties.id, frame: "select" })}
				/>
				<ButtonOption
					name="Rotar"
					icon="ic:round-screen-rotation-alt"
					onClick={() => AddHistoryItem({ modalName: "rotation", id: properties.id, frame: "rotation" })}
				/>
				<ButtonOption
					name="Rename"
					icon="fluent:rename-24-regular"
					onClick={() => AddHistoryItem({ modalName: "rename", id: properties.id, frame: "select" })}
				/>
				<ButtonOption name="Eliminar" icon="tabler:trash" onClick={() => onChange({ ...properties, deleteMe: true })} />
			</div>
		</ModalBasic>
	);
}

ModalTools.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
