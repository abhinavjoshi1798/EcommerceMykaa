import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Image } from "@chakra-ui/react";
const images = [
	"https://images-static.nykaa.com/uploads/44a819ee-6614-48c4-b5b1-932c3479d4e2.jpg?tr=w-2400,cm-pad_resize",
	"https://images-static.nykaa.com/uploads/5d515b32-6bb1-44d0-889c-b709c2545e54.jpg?tr=w-2400,cm-pad_resize",
	"https://images-static.nykaa.com/uploads/cecdd883-aa65-4e68-8f78-bdc82d5577a0.jpg?tr=w-2400,cm-pad_resize",
];

const AllProductsCarousel = ({ src = images }) => {
	return (
		<div>
			<Swiper
				modules={[Navigation, Pagination,Autoplay]}
				navigation={true}
				spaceBetween={30}
				pagination={{
					clickable: true,
				}}
                autoplay={{
                  "delay": 2500,
                  "disableOnInteraction": false
                }}
				style={{
					width: "90%",
					height: "100%",
					"--swiper-navigation-color": "#ffffff",
					"--swiper-navigation-size": "2rem",
					"--swiper-pagination-color": "#ffffff",
				}}
				loop={true}>
				{src.map((item, index) => {
					return (
						<SwiperSlide key={index}>
							<Image src={item} alt={item} />
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default AllProductsCarousel;
