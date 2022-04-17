@if($image)
    <section class="section section--image">
        <img
            src="{{$uploadPath($image)}}"
            alt="{{$alt}}"
            class="img-fluid"
            loading="lazy"
        />
    </section>
@endif