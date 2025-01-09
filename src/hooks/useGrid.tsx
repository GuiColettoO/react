import Chart from "@/Components/Chart";
import _ from "lodash";
import { useState, useCallback } from "react";

interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  add?: boolean;
}

export const useGrid = () => {
  const [items, setItems] = useState<GridItem[]>(
    [0, 1, 2, 3, 4].map((i, _, list) => ({
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
    lg: items.map((item) => ({
      i: item.i,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
    })),
  });

  const onAddItem = useCallback(() => {
    const newItem: GridItem = {
      i: `n${newCounter}`,
      x: (items.length * 2) % 12,
      y: Infinity,
      w: 6,
      h: 8,
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
        },
      ],
    }));

    setNewCounter((prevCounter) => prevCounter + 1);
  }, [items, newCounter]);

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
          }}
          className="box"
        >
          {el.add ? (
            <button
              className="add-button"
              onClick={onAddItem}
              title="You can add an item by clicking here, too."
            >
              Add +
            </button>
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
          <button
            className="remove-button"
            style={removeStyle}
            onClick={() => onRemoveItem(el.i)}
            title="Remove this item"
          >
            x
          </button>
        </div>
      );
    },
    [onAddItem, onRemoveItem]
  );

  return {
    items,
    layouts,
    onAddItem,
    onRemoveItem,
    createElement,
  };
};
