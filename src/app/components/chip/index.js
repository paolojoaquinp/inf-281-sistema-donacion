import React from "react";
import { ChipWrapper } from "./chip-styled";
const Chip = ({ label }) => {
    return (
        <ChipWrapper status={label}>
            {label}
        </ChipWrapper>
    );
}

export default Chip;