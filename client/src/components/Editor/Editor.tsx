import React from "react";
import { RxCross2 } from "react-icons/rx";
import Colors from "../Colors/Colors";

function Editor({ hidePopup }) {
    const handleClick = () => { 
	hidePopup();
    };

    return (
        <main
            onClick={handleClick}
            className="min-h-screen min-w-full bg-black bg-opacity-40 text-white absolute scroll-m-8 top-0 left-0 flex justify-center items-center"
        >
            {/* Popup area */}
            <div className="lg:my-4 lg:rounded-md w-full bg-texture bg-white bg-fixed bg-cover flex sm:pt-10 sm:max-w-[850px] justify-center items-center p-4">
                {/* article area */}
                <div className="flex flex-col items-start sm:max-w-[924px] text-slate-700 gap-4 sm:gap-8">
                    <div className="flex justify-between w-full sm:max-w-[580px]">
                        <div><Colors /></div>
                        <button>
                            <RxCross2 />
                        </button>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-semibold border-b-2 border-b-purple-600 pb-4">7 Tips to Build Scalable Node.js Applications</h1>

                    <article className="sm:max-w-[580px] ">
                        One of the biggest problems when working with multiple mobile platforms is
                        push notifications. You need to understand how to interact with every one of
                        the backends from Apple, Google and Microsoft to be able to send the
                        notifications to the devices. Azure has an awesome service called
                        Notifications Hub, part of Service Bus, that help you to simplify this task.
                        One of the biggest problems when working with multiple mobile platforms is
                        push notifications. You need to understand how to interact with every one of
                        the backends from Apple, Google and Microsoft to be able to send the
                        notifications to the devices. Azure has an awesome service called
                        Notifications Hub, part of Service Bus, that help you to simplify this task.
                        One of the biggest problems when working with multiple mobile platforms is
                        push notifications. You need to understand how to interact with every one of
                        the backends from Apple, Google and Microsoft to be able to send the
                        notifications to the devices. Azure has an awesome service called
                        Notifications Hub, part of Service Bus, that help you to simplify this task.
                        One of the biggest problems when working with multiple mobile platforms is
                        push notifications. You need to understand how to interact with every one of
                        the backends from Apple, Google and Microsoft to be able to send the
                        notifications to the devices. Azure has an awesome service called
                        Notifications Hub, part of Service Bus, that help you to simplify this task.
                        One of the biggest problems when working with multiple mobile platforms is
                        push notifications. You need to understand how to interact with every one of
                        the backends from Apple, Google and Microsoft to be able to send the
                        notifications to the devices. Azure has an awesome service called
                        Notifications Hub, part of Service Bus, that help you to simplify this task.
                        Notifications Hub, part of Service Bus, that help you to simplify this task.
                        One of the biggest problems when working with multiple mobile platforms is
                        push notifications. You need to understand how to interact with every one of
                        the backends from Apple, Google and Microsoft to be able to send the
                        notifications to the devices. Azure has an awesome service called
                        Notifications Hub, part of Service Bus, that help you to simplify this task.
                        One of the biggest problems when working with multiple mobile platforms is
                        push notifications. You need to understand how to interact with every one of
                        the backends from Apple, Google and Microsoft to be able to send the
                        notifications to the devices. Azure has an awesome service called
                        Notifications Hub, part of with every one of the backends from Apple, Google
                        and Microsoft to be able to send the notifications to the devices. Azure has
                        an awesome service called Notifications Hub, part of Service Bus, that help
                        you to simplify this task. One of the biggest problems when working with
                        multiple mobile platforms is push notifications. You need to understand how
                        to interact with every one of the backends from Apple, Google and Microsoft
                        to be able to send the notifications to the devices. Azure has an awesome
                        service called Notifications Hub, part of send the notifications to the
                        devices. Azure has an awesome service called Notifications Hub, part of
                        Service Bus, that help you to simplify this task. One of the biggest
                        problems when working with multiple mobile platforms is push notifications.
                        You need to understand how to interact with every one of the backends from
                        Apple, Google and Microsoft to be able to send the notifications to the
                        devices. Azure has an awesome service called Notifications Hub, part of send
                        the notifications to the devices. Azure has an awesome service called
                        Notifications Hub, part of Service Bus, that help you to simplify this task.
                        One of the biggest problems when working with multiple mobile platforms is
                        push notifications. You need to understand how to interact with every one of
                        the backends from Apple, Google and Microsoft to be able to send the
                        notifications to the devices. Azure has an awesome service called
                        Notifications Hub, part of send the notifications to the devices. Azure has
                        an awesome service called Notifications Hub, part of Service Bus, that help
                        you to simplify this task. One of the biggest problems when working with
                        multiple mobile platforms is push notifications. You need to understand how
                        to interact with every one of the backends from Apple, Google and Microsoft
                        to be able to send the notifications to the devices. Azure has an awesome
                        service called Notifications Hub, part of Service Bus, that help you to
                        simplify this task. Abhishek
                    </article>
                </div>
            </div>
        </main>
    );
}

export default Editor;
