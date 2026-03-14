import { Truck, PiggyBank, Timer, CreditCard } from "lucide-react"

const features = [
    {
        icon: Truck,
        title: "Fast Delivery",
        description: "Start from $10",
    },
    {
        icon: PiggyBank,
        title: "Money Guarantee",
        description: "7 Days Back",
    },
    {
        icon: Timer,
        title: "365 Days",
        description: "For free return",
    },
    {
        icon: CreditCard,
        title: "Payment",
        description: "Secure system",
    },
]

export default function FeatureBar() {
    return (
        <div className="w-full flex justify-center py-10">
            <div className="w-full max-w-[1450px] bg-muted/40 rounded-xl border flex divide-x">
                {features.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <div
                            key={index}
                            className="flex items-center gap-4 flex-1 px-8 py-6"
                        >
                            <Icon className="w-8 h-8 text-muted-foreground" />

                            <div>
                                <p className="font-semibold text-base">{item.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}