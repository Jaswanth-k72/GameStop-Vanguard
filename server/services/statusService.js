export function canApprove(status) {
    return status === "Pending";
}

export function canReject(status) {
    return status === "Pending";
}

export function canStart(status) {
    return status === "Approved";
}

export function canComplete(status) {
    return status === "Active";
}