import React from "react";
import format from "date-fns/format";
import {
	TableContainer,
	Table as MuiTable,
	TableHead,
	TableRow,
	TableCell,
	tableCellClasses,
	TableBody,
	Paper,
	styled,
	Pagination,
} from "@mui/material";

import Btn from "./Btn";
import LoadingData from "./LoadingData";
import "./table/table.css"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#F6F2F0",
		color: theme.palette.common.black,
		fontWeight: "bold",
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 15,
	},
}));

const Table = ({ isLoading = false, actions=false, columns, data, head, foot, paginate, handleViewDetails }) => {
	// Helper function to render cell content based on type
	const renderCellContent = (column, row, index) => {
		const value = row[column.field];

		switch (column.type) {
			case "image":
				return (
					<img
						src={value}
						alt={`${row.id}-image`}
						style={{
							width: "65px",
							height: "55px",
							objectFit: "cover",
						}}
					/>
				);
			case "date":
				return !isNaN(Date.parse(value))
					? format(new Date(value), "MMM do, yyyy")
					: value;
			case "number":
				return index + 1;
			default:
				return value;
		}
	};

	return (
		<div className="table-wrapper">
			{head && (
				<div className="table-head">
					{" "}
					<span className="title"> {head} </span>{" "}
				</div>
			)}

			<div className="table-body">
				{isLoading ? (
					<LoadingData />
				) : (
					<TableContainer component={Paper}>
						<MuiTable sx={{ minWidth: 600 }}>
							<TableHead>
								<TableRow>
									{columns.map((column) => (
										<StyledTableCell
											key={column.field}
											style={{
												minWidth: column.minWidth,
											}}
										>
											{column.headerName}
										</StyledTableCell>
									))}
									{actions && (
										<StyledTableCell>
											Actions
										</StyledTableCell>
									)}
								</TableRow>
							</TableHead>

							<TableBody>
								{data.map((row, index) => (
									<TableRow key={index}>
										{columns.map((column) => (
											<StyledTableCell key={column.field}>
												{renderCellContent(column, row, index)}
											</StyledTableCell>
										))}

										{handleViewDetails && (
											<StyledTableCell>
												<Btn
													txt={"View"}
													className="ghost-rounded"
													handleClick={() =>
														handleViewDetails(
															row.id
														)
													}
												/>
											</StyledTableCell>
										)}
									</TableRow>
								))}
							</TableBody>
						</MuiTable>
					</TableContainer>
				)}
			</div>

			{foot && (
				<div className="table-foot">
					{paginate ? (
						<Pagination
							count={paginate.totalPages}
							page={paginate.page}
							onChange={paginate.handlePageChange}
							shape="rounded"
							color="primary"
						/>
					) : (
						<></>
					)}
				</div>
			)}
		</div>
	);
};

export default Table;
