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
  MenuItem,
  OutlinedInput,
  Select,
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

type Order = "asc" | "desc";

interface HeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
}

interface ReusableTableProps<T> {
  rows: T[];
  headCells: HeadCell<T>[];
  title?: string;
  enableSelect?: boolean;
  enablePagination?: boolean;
  enableSorting?: boolean;
  moduleID: number;
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

  const [selectedUser, setSelectedUser] = React.useState({});

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

  const handleClick = (event: React.MouseEvent<unknown>, index: number) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

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

  const icon = rows?.map((icon, index) => ({
    ...icon,
    id: index + 1,
    action: (
      <>
        <IconButton
          color="info"
          onClick={() => {
            setSelectedUser(icon);
            setOpen(true);
          }}
          sx={{ border: "1px solid #ececec", borderRadius: "10px" }}
        >
          <VisibilityOutlinedIcon />
        </IconButton>
      </>
    ),
  }));

  const visibleRows = React.useMemo(
    () =>
      [...icon]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, icon],
  );

  console.log(visibleRows, "visibleRows");

  return (
    <>
      <Box sx={{ width: "100%", padding: 0 }}>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // gap: 1,
            mb: 2,
          }}
        >
          {/* <Grid
            textAlign={"left"}
            display={"flex"}
            // alignItems={"center"}
            gap={2}
            size={{ xs: 12, sm: 6 }}
          >
            {selected.length > 0 && (
              <Tooltip title="Delete">
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<DeleteIcon sx={{ fontSize: "18px" }} />}
                >
                  {selected.length > 0 ? (
                    <Typography variant="body2">
                      {selected.length} selected
                    </Typography>
                  ) : null}
                </Button>
              </Tooltip>
            )}
          </Grid> */}
        </Grid>

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
              {visibleRows.map((row: any, index: number) => (
                <TableRow
                  hover
                  key={index}
                  selected={selected.includes(index)}
                  onClick={(event) => handleClick(event, index)}
                >
                  {headCell.map((headCell: any) => {
                    return (
                      <TableCell
                        key={headCell.id as string}
                        sx={{
                          fontWeight: "500",
                          fontSize: "12px",
                          borderBottom: "1px solid #ececec",
                        }}
                        align={headCell.numeric ? "left" : "left"}
                      >
                        {row[headCell.id]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
