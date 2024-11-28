<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class MediaData extends Data
{
    public function __construct(
        public int    $id,
        public string $model_type,
        public string $model_id,
        public string $uuid,
        public string $collection_name,
        public string $name,
        public string $file_name,
        public string $mime_type,
        public string $disk,
        public int    $size,
        public int    $order_column,
        public string $created_at,
        public string $updated_at,
        public string $original_url,
        public string $preview_url,
        public ?string $temporary_url,
    )
    {
    }

    public static function fromModel(\Spatie\MediaLibrary\MediaCollections\Models\Media $media): self
    {
        return new self(
            id: $media->id,
            model_type: $media->model_type,
            model_id: $media->model_id,
            uuid: $media->uuid,
            collection_name: $media->collection_name,
            name: $media->name,
            file_name: $media->file_name,
            mime_type: $media->mime_type,
            disk: $media->disk,
            size: $media->size,
            order_column: $media->order_column,
            created_at: $media->created_at->toDateTimeString(),
            updated_at: $media->updated_at->toDateTimeString(),
            original_url: $media->getUrl(),
            preview_url: $media->hasGeneratedConversion('preview') ? $media->getUrl('preview') : '',
            temporary_url:  null,
        );
    }
}
