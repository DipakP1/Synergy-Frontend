import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TableContainer,
  TextField,
  useTheme,
} from "@mui/material";
import { CustomPagination, CustomPaginationNumber } from "./TablePagination";
import Grid from "@mui/material/Grid2";
import { usePathname, useRouter } from "next/navigation";
import InputAdornment from "@mui/material/InputAdornment";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ViewUserMessage from "./ViewUserMessage";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { enqueueSnackbar } from "notistack";
import { exportdataExcel, exportToPdf } from "./Export/exportData";
import dayjs from "dayjs";
import { ExportDataIntoExcel, GeneratePDF } from "@/app/lib/Export";

type Order = "asc" | "desc";

interface HeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
}

function descendingComparator<T extends { [key: string]: string | number }>(
  a: T,
  b: T,
  orderBy: keyof T,
) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: string | number },
  b: { [key in Key]: string | number },
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead<T>({
  headCells,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  enableSelect = false,
  enableSorting = false,
}: any) {
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const theme = useTheme();

  return (
    <TableHead sx={{ width: "30px", height: 60 }}>
      <TableRow>
        {enableSelect && (
          <TableCell
            sx={{
              borderBottom: "1px solid #ececec",
              backgroundColor: "#ececec",
              color: "black",
              // borderTop: "1px solid #0003",
            }}
            padding="checkbox"
          >
            <Checkbox
              sx={{ color: "#0003" }}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id as string}
            align={headCell.numeric ? "left" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              borderBottom: "1px solid #ececec",
              backgroundColor: "#ececec",
              color: "black",
              fontWeight: "bold",
            }}
          >
            {enableSorting ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "14px",
                    "&:hover": { color: "black" },
                  }}
                >
                  {headCell.label}
                </Typography>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function InquiryTable({ rows, headCell }: any) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<any>(headCell[0]?.id);
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState({});
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleCloseEditDialog = () => {
    setOpen(false);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((_, index) => index);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event: React.MouseEvent<unknown>, index: number) => {
  //   const selectedIndex = selected.indexOf(index);
  //   let newSelected: readonly number[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, index);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setRowsPerPage(parseInt(event.target.value as string, 10));
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    // return dayjs(dateString).format("DD-MM-YYYY HH:mm");
    return dayjs(dateString).format("DD-MM-YYYY");
  };

  const icon = rows?.map((icon, index) => ({
    ...icon,
    id: index + 1,
    // action: (
    //   <IconButton
    //     color="info"
    //     onClick={() => {
    //       setSelectedUser(icon);
    //       setOpen(true);
    //     }}
    //     sx={{
    //       border: "1px solid #ececec",
    //       m: 0,
    //       borderRadius: "10px",
    //     }}
    //   >
    //     <VisibilityOutlinedIcon sx={{ fontSize: "16px", m: 0, p: 0 }} />
    //   </IconButton>
    // ),
  }));
  const filteredRows = icon.filter((row) => {
    const rowDate = dayjs(row.created_at);
    const isAfterStartDate = startDate
      ? rowDate.isAfter(dayjs(startDate))
      : true;
    const isBeforeEndDate = endDate ? rowDate.isBefore(dayjs(endDate)) : true;
    return isAfterStartDate && isBeforeEndDate;
  });

  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredRows],
  );

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
    setIsOpen((isOpen: any) => !isOpen);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      <Box sx={{ width: "100%", padding: 0 }}>
        <Stack
          spacing={2}
          gap={2}
          justifyContent={"space-between"}
          my={2}
          direction={"row"}
          alignItems={"center"}
        >
          {/* Date Filter Inputs */}
          <Box display="flex" gap={2} mb={2}>
            <TextField
              size="small"
              label={
                <Typography
                  color="white"
                  sx={{ backgroundColor: "grey", px: 1, borderRadius: "5px" }}
                >
                  From Date
                </Typography>
              }
              sx={{ color: "red", backgroundColor: "lightgrey" }}
              type="date"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              size="small"
              label={
                <Typography
                  color="white"
                  sx={{ backgroundColor: "grey", px: 1, borderRadius: "5px" }}
                >
                  To Date
                </Typography>
              }
              sx={{ color: "red", backgroundColor: "lightgrey" }}
              type="date"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {startDate && endDate && (
              <Button
                size="small"
                color="warning"
                variant="outlined"
                onClick={resetFilters}
              >
                Reset
              </Button>
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              size="small"
              variant="contained"
              onClick={handleClick2}
              style={{
                cursor: "pointer",
                margin: "4px 0",
                backgroundColor: "blue",
              }}
            >
              Export
            </Button>

            {isOpen && (
              <Menu
                id="msgs-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
                anchorOrigin={{
                  horizontal: "right",
                  vertical: "bottom",
                }}
                transformOrigin={{
                  horizontal: "right",
                  vertical: "top",
                }}
                sx={{
                  "& .MuiMenu-paper": {
                    width: "200px",
                    color: "#131121",
                  },
                }}
              >
                <MenuItem
                  onClick={() =>
                    GeneratePDF(
                      [
                        "Id",
                        "name",
                        "email",
                        "subject",
                        "phone_no",
                        "message",
                        "created_at",
                      ],
                      "Users List",
                      rows,
                    )
                  }
                >
                  <ListItemText> Export to Pdf </ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={(event) =>
                    ExportDataIntoExcel("Users List", "users sheet", rows)
                  }
                >
                  <ListItemText> Export To excel </ListItemText>
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Stack>

        <TableContainer
          sx={{
            // maxHeight: 540,
            border: "1px solid #ececec",
            borderRadius: "10px",
          }}
          className="custom-scrollbar"
        >
          <Table stickyHeader aria-label="sticky table" size={"medium"}>
            <EnhancedTableHead
              headCells={headCell}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow key={index}>
                  {headCell.map((headCell) => (
                    <TableCell key={headCell.id as string}>
                      {headCell.id === "created_at"
                        ? formatDate(row[headCell.id])
                        : row[headCell.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box display={"flex"} alignItems={"center"} my={2}>
        <CustomPagination
          count={icon.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <CustomPaginationNumber
          count={icon.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <ViewUserMessage
        open={open}
        close={handleCloseEditDialog}
        selectedUser={selectedUser}
      />
    </>
  );
}

export default InquiryTable;
