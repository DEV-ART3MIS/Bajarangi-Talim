import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block lg:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute top-full mt-3 right-0 flex flex-col gap-2 p-2 rounded-2xl bg-[#0c0f17]/95 backdrop-blur-xl border border-gray-800 shadow-2xl z-50 min-w-[180px]"
          >
            {items.map((item, idx) => (
              <motion.button
                key={item.title}
                initial={{ opacity: 0, x: 10 }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: 10,
                  transition: {
                    delay: idx * 0.03,
                  },
                }}
                transition={{ delay: idx * 0.03 }}
                type="button"
                onClick={(e) => {
                  if (item.onClick) item.onClick(e);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left w-full",
                  item.active
                    ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/80"
                )}
              >
                <div className="h-5 w-5 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <span className="truncate">{item.title}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-xl bg-neutral-900/90 backdrop-blur-md flex items-center justify-center border border-neutral-700/80 text-orange-400 hover:text-white hover:border-orange-500/50 shadow-lg transition"
        aria-label="Toggle menu"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden lg:flex h-14 gap-2.5 items-center rounded-2xl bg-[#0c0f17]/90 backdrop-blur-xl px-3 border border-gray-800/90 shadow-2xl shadow-black/80",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href = "#",
  onClick,
  active,
}) {
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [38, 54, 38]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [38, 54, 38]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [18, 28, 18]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [18, 28, 18]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      className="outline-none focus:outline-none"
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "aspect-square rounded-xl flex items-center justify-center relative transition-colors duration-200 cursor-pointer",
          active
            ? "bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 border border-amber-400/50"
            : "bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800/80 hover:border-gray-700"
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2.5 py-1 whitespace-pre rounded-md bg-neutral-950/95 border border-neutral-700/80 text-white text-[11px] font-semibold tracking-wide absolute left-1/2 -translate-x-1/2 -top-9 w-fit shadow-xl pointer-events-none z-50"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}

