{{--
Detail rating
--}}
@if($detail['detail'])
    <div class="shared-detail rating">
        <rating
                model-type="{{$detail['model']}}"
                :model-id="{{$detail['detail']['id']}}"
                :likes="{{$detail['detail']['likes']}}"
                :dislikes="{{$detail['detail']['dislikes']}}"
        />
    </div>
@endif