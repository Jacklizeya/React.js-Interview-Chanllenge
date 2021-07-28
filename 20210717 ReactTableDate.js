import React from 'react'

// This column is passing all the information to this component
export default function DateRangeColumnFilter({ column: { filterValue = [], preFilteredRows, setFilter, id }}) {
 
    console.log("entering data range Filter ***************************")
    console.log("filterValue", filterValue)

    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[preFilteredRows.length-1].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        return [min, max];
    }, [id, preFilteredRows]);
//  React table doesnot allow to setFilter([min, max]) here, not quite sure why
//  This is the only way I find to store data
//  I need to initialize it in this way, very strange way....
    filterValue.push(min, max)

    return (
        <div
            style={{
                display: "flex"
            }}
        >
      <input
                value={filterValue[0] || ""}
                type="date"
                min={min}
                onChange={e => {
                    const val = e.target.value;
                    console.log(e.target.value);
                    // Pass initial value to the Filter, the modify it
                    setFilter((old = [])=> [min, max])
                    setFilter((old = []) => [val ? (val) : undefined, old[1]]);
                }}
                
                style={{
                    width: "170px",
                    marginRight: "0.5rem"
                }}
            />
            to
      <input
                value={filterValue[1] || ""}
                type="date"
                max={max}
                onChange={e => {
                    const val = e.target.value;
                    setFilter((old = [])=> [min, max])
                    setFilter((old = []) => [old[0], val ? (val) : undefined]);
                }}
                
                style={{
                    width: "170px",
                    marginLeft: "0.5rem"
                }}
            />
        </div>
    );
}
