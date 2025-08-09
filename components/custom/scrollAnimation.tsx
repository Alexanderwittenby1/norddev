    "use client"

    import { motion, useScroll, useSpring, useTransform } from "motion/react"

    export default function ScrollLinked() {
        const { scrollYProgress } = useScroll();
        const scaleX = useSpring(scrollYProgress, {damping: 100, stiffness: 400});
        const backgroundColor = useTransform(scrollYProgress, [0, 1], ["#0000ff","#fff"]);

        return (
            <>
                <motion.div
                    id="scroll-indicator"
                    style={{
                        scaleX: scaleX,
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 10,
                        originX: 0,
                        backgroundColor: backgroundColor,
                        borderRadius: "0 0 10px 10px",
                    }}
                />
                
            </>
        )
    }

