<section
    class="section section--rating"
>
    <rating
        model-type="{{$detail['model']}}"
        :model-id="{{$detail['detail']['id']}}"
        :likes="{{$detail['detail']['likes']}}"
        :dislikes="{{$detail['detail']['dislikes']}}"
    />
</section>
