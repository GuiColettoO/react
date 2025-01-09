import React, { useState, useCallback } from "react";
import { WidthProvider, Responsive, Layout } from "react-grid-layout";
import _ from "lodash";
import "./style/AddRemoveLayout.css";
import Chart from "./Components/Chart";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface AddRemoveLayoutProps {
  className?: string;
  cols: { [key: string]: number };
  rowHeight: number;
  onLayoutChange?: (layout: Layout[]) => void;
}

interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  add?: boolean;
}

const AddRemoveLayout: React.FC<AddRemoveLayoutProps> = ({
  className = "layout",
  cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight = 100,
  onLayoutChange,
}) => {
  const [items, setItems] = useState<GridItem[]>(
    [0, 1, 2, 3, 4].map((i, key, list) => ({
      i: i.toString(),
      x: i * 2,
      y: 0,
      w: 2,
      h: 2,
      add: i === list.length - 1,
    }))
  );
  const [newCounter, setNewCounter] = useState(0);
  const [layouts, setLayouts] = useState({
    lg: items.map((item) => ({ i: item.i, ...item })),
  });
  const [breakpoint, setBreakpoint] = useState<string | undefined>(undefined);
  const [layout, setLayout] = useState<Layout[] | undefined>(undefined);

  const onAddItem = useCallback(() => {
    const newItem = {
      i: "n" + newCounter,
      x: (items.length * 2) % (cols.lg || 12),
      y: Infinity,
      w: 2,
      h: 2,
      minW: 2,
      minH: 2,
      maxW: 6,
      maxH: 6,
    };
    setItems((prevItems) => [...prevItems, newItem]);
    setLayouts((prevLayouts) => ({
      ...prevLayouts,
      lg: [
        ...prevLayouts.lg,
        {
          i: newItem.i,
          x: newItem.x,
          y: newItem.y,
          w: newItem.w,
          h: newItem.h,
          minW: newItem.minW,
          minH: newItem.minH,
          maxW: newItem.maxW,
          maxH: newItem.maxH,
        },
      ],
    }));
    setNewCounter((prevCounter) => prevCounter + 1);
  }, [newCounter, cols, items]);

  const onRemoveItem = useCallback((i: string) => {
    console.log("removing", i);
    setItems((prevItems) => _.reject(prevItems, { i }));
    setLayouts((prevLayouts) => ({
      ...prevLayouts,
      lg: prevLayouts.lg.filter((layout) => layout.i !== i),
    }));
  }, []);

  const createElement = useCallback(
    (el: GridItem) => {
      const removeStyle: React.CSSProperties = {
        position: "absolute",
        right: "2px",
        top: 0,
        cursor: "pointer",
      };
      const i = el.add ? "+" : el.i;
      return (
        <div
          key={i}
          data-grid={{
            i: el.i,
            x: el.x,
            y: el.y,
            w: el.w,
            h: el.h,
            minW: 2,
            minH: 2,
            maxW: 6,
            maxH: 6,
          }}
          className="box"
        >
          {el.add ? (
            <span
              className="add text"
              onClick={onAddItem}
              title="You can add an item by clicking here, too."
            >
              Add +
            </span>
          ) : (
            <Chart
              title={"Teste"}
              data={[{ name: "Jan", users: 1500, active: 1000 }]}
              lines={[
                {
                  dataKey: "users",
                  stroke: "#8884d8",
                  name: "Total Usuários",
                },
              ]}
            />
          )}
          <span
            className="remove"
            style={removeStyle}
            onClick={() => onRemoveItem(el.i)}
          >
            x
          </span>
        </div>
      );
    },
    [onAddItem, onRemoveItem]
  );

  const onBreakpointChange = useCallback(
    (newBreakpoint: string, newCols: number) => {
      setBreakpoint(newBreakpoint);
    },
    []
  );

  const onLayoutChangeHandler = useCallback(
    (newLayout: Layout[]) => {
      setLayouts((prevLayouts) => ({
        ...prevLayouts,
        lg: newLayout,
      }));
      setItems((prevItems) =>
        prevItems.map((item) => {
          const layoutItem = newLayout.find((l) => l.i === item.i);
          return layoutItem ? { ...item, ...layoutItem } : item;
        })
      );
      if (onLayoutChange) {
        onLayoutChange(newLayout);
      }
    },
    [onLayoutChange]
  );

  return (
    <div>
      <button onClick={onAddItem}>Add Item</button>
      <ResponsiveReactGridLayout
        className={className}
        cols={cols}
        rowHeight={rowHeight}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        layouts={layouts}
        onLayoutChange={onLayoutChangeHandler}
        onBreakpointChange={onBreakpointChange}
        isDraggable
        isResizable={true}
      >
        {items.map((el) => createElement(el))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default AddRemoveLayout;
