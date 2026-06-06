def calculate_spoilage_percentage(

    critical_batches,
    total_batches

):

    if total_batches == 0:

        return 0

    return round(

        (critical_batches / total_batches) * 100,

        2
    )


def calculate_average_quality(

    inventory_items

):

    if not inventory_items:

        return 0

    total_quality = sum(

        item.quality

        for item in inventory_items
    )

    return round(

        total_quality / len(inventory_items),

        2
    )


def calculate_utilization_percentage(

    occupied_capacity,
    total_capacity

):

    if total_capacity == 0:

        return 0

    return round(

        (
            occupied_capacity /
            total_capacity
        ) * 100,

        2
    )