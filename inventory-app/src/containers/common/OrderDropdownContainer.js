import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeOrder, clickOrder, hoverOrder, changeOrder } from "../../modules/order";
import OrderDropdown from '../../components/common/OrderDropdown';

const OrderDropdownContainer = () => {
  const dispatch = useDispatch();
  const { hover, display, list, order } = useSelector(({ order }) => ({
    hover: order.hover,
    display: order.display,
    list: order.list,
    order: order.order
  }));

  // onMouseOver -> hover
  const onMouseOver = () => {
    dispatch(hoverOrder());
  };

  // onClick -> show / hide
  const onClick = () => {
    dispatch((clickOrder()));
  };

  // 정렬 기준 변경
  const onChange = () => {
    dispatch(changeOrder());
  }

  // 컴포넌트 처음 렌더링될 때 초기화
  useEffect(()=> {
    dispatch(initializeOrder());
  }, [dispatch]);

  return (
    <OrderDropdown
      onChange={onChange}
      onClick={onClick}
      onMouseOver={onMouseOver}
      display={display}
    />
  );
};

export default OrderDropdownContainer;