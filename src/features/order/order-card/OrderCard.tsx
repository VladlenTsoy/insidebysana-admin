import React from "react"
import {Draggable} from "react-beautiful-dnd"
import {Button, Dropdown, Menu, Tooltip} from "antd"
import {
    CalendarOutlined,
    CarOutlined,
    CheckOutlined, ContainerOutlined,
    DeleteOutlined,
    EditOutlined,
    FieldNumberOutlined,
    HourglassOutlined,
    IdcardOutlined,
    InfoCircleOutlined,
    MoreOutlined,
    PhoneFilled,
    SkinOutlined,
    StopOutlined,
    UserOutlined
} from "@ant-design/icons"
import {formatPrice} from "utils/formatPrice"
import {OrderCardType} from "types//Order"
import {formatDate} from "utils/formatDate"
import HideOrderAction from "./HideOrderAction"
import {Link} from "react-router-dom"
import cn from "classnames"
import styles from "./OrderCard.module.less"
import SendToArchiveOrder from "./SendToArchiveOrderAction"

interface OrderCardProps {
    order: OrderCardType
    index: number
}

const menuItems = (order: OrderCardType) => [
    {
        icon: <InfoCircleOutlined />,
        label: <Link to={`/orders/order/more/${order.id}`}>
            <span>Подробнее</span>
        </Link>,
        key: "more"
    },
    {
        icon: <EditOutlined />,
        label: <Link to={`/orders/order/edit/${order.id}`}>
            <span>Редактировать</span>
        </Link>,
        key: "edit"
    },
    {
        icon: <ContainerOutlined />,
        label: <SendToArchiveOrder orderId={order.id} />,
        key: "archive"
    },
    {
        icon: <DeleteOutlined />,
        label: <HideOrderAction orderId={order.id} />,
        key: "hide",
        danger: true
    }
    // {
    //     icon: <DeleteOutlined />,
    //     label: <DeleteOrder orderId={order.id} />,
    //     key: "delete",
    //     danger: true
    // }
]

const OrderCard: React.FC<OrderCardProps> = ({order, index}) => {
    return (
        <Draggable draggableId={`order-${order.id}`} key={order.id} index={index}>
            {provided => (
                <div
                    className={cn(styles.orderCard, "order-card")}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className={styles.header}>
                        <div className={styles.information}>
                            <div className={styles.date}>
                                <CalendarOutlined />
                                <span>{formatDate(order.created_at)}</span>
                            </div>
                            <div>
                                <div className={styles.id}>
                                    <FieldNumberOutlined />
                                    <span>{order.id}</span>
                                </div>
                            </div>
                        </div>
                        {order.delivery && order.delivery.price !== 0 && (
                            <div className={styles.delivery}>
                                <Tooltip title={order.delivery.title}>
                                    <CarOutlined />
                                </Tooltip>
                            </div>
                        )}
                        <div className={styles.status}>
                            {order.payment_state === 1 && (
                                <Tooltip title="Оплачен">
                                    <div className={styles.check}>
                                        <CheckOutlined />
                                    </div>
                                </Tooltip>
                            )}
                            {order.payment_state === -1 && (
                                <Tooltip title="Отменен">
                                    <div className={styles.cancel}>
                                        <StopOutlined />
                                    </div>
                                </Tooltip>
                            )}
                            {order.payment_state === 0 && (
                                <Tooltip title="Ожидание">
                                    <div className={styles.wait}>
                                        <HourglassOutlined />
                                    </div>
                                </Tooltip>
                            )}
                        </div>
                        <div className={styles.action}>
                            <Dropdown
                                overlay={<Menu items={menuItems(order)} />}
                                placement="bottomRight"
                                arrow
                                trigger={["click"]}
                            >
                                <Button icon={<MoreOutlined />} />
                            </Dropdown>
                        </div>
                    </div>
                    {!!order.client && (
                        <div className={styles.client}>
                            <div className={styles.information}>
                                <UserOutlined />
                                <span className={styles.fullName}>{order.client.full_name}</span>
                            </div>
                            <div className={styles.actions}>
                                {/*<ClientMoreAction clientId={order.client.id}>*/}
                                <Button icon={<IdcardOutlined />} />
                                {/*</ClientMoreAction>*/}
                                {order.client.phone && (
                                    <a href={`tel:${order.client.phone}`}>
                                        <Button icon={<PhoneFilled />} />
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                    <div className={styles.footer}>
                        <div className={styles.information}>
                            <div className={styles.products}>
                                <SkinOutlined />
                                <b>{order.product_color_qty}</b>
                            </div>
                        </div>
                        <div className={styles.totalPrice}>
                            {order.promo_code && (
                                <div className={styles.discount}>
                                    <span>{order.promo_code.code}</span>
                                    {order.promo_code.type === "percent" ? (
                                        <>
                                            -<b>{order.promo_code.discount}</b>%
                                        </>
                                    ) : (
                                        <>
                                            -<b>{order.promo_code.discount}</b>сум
                                        </>
                                    )}
                                </div>
                            )}
                            {order.discount && (
                                <div className={styles.discount}>
                                    Скидка
                                    {order.discount.type === "percent" ? (
                                        <>
                                            -<b>{order.discount.discount}</b>%
                                        </>
                                    ) : (
                                        <>
                                            -<b>{formatPrice(order.discount.discount)}</b>сум
                                        </>
                                    )}
                                </div>
                            )}
                            <div className={styles.price}>
                                <b>{formatPrice(order.total_price)}</b> сум
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default React.memo<OrderCardProps>(OrderCard)
